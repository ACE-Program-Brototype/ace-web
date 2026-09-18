import { useState, useEffect, useRef, useCallback } from 'react';
import './LaunchLoader.css';
import launchVideo from '../../../assets/launch/launch_final.mp4';
import { IS_LAUNCH_ENABLED } from '../../constants/launchConfig';

// Vertex Shader for WebGL Chroma Key
const VS_SOURCE = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// Fragment Shader with YCbCr Chroma-Key, Spill Suppression and Premultiplied Alpha
const FS_SOURCE = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_image;
  uniform vec3 u_keyColor;
  uniform float u_similarity;
  uniform float u_smoothness;
  uniform float u_spill;

  vec2 RGBtoUV(vec3 rgb) {
    return vec2(
      -0.168736 * rgb.r - 0.331264 * rgb.g + 0.500000 * rgb.b,
       0.500000 * rgb.r - 0.418688 * rgb.g - 0.081312 * rgb.b
    );
  }

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    vec2 keyUV = RGBtoUV(u_keyColor);
    vec2 curUV = RGBtoUV(color.rgb);

    // Euclidean distance in chroma space
    float chromaDist = length(curUV - keyUV);
    float maxRB = max(color.r, color.b);

    // Soft alpha transition between similarity and smoothness thresholds
    float alpha = smoothstep(u_similarity, u_similarity + u_smoothness, chromaDist);

    // If green is not dominant over red and blue, preserve subject pixels completely
    if (color.g <= maxRB) {
      alpha = 1.0;
    }

    // Spill suppression: desaturate green reflections on subject edges
    float spillAmount = clamp((color.g - maxRB) * u_spill * 2.0, 0.0, 1.0);
    vec3 cleanRgb = color.rgb;
    cleanRgb.g = mix(cleanRgb.g, maxRB, spillAmount);

    // Output with premultiplied alpha for seamless WebGL DOM compositing
    gl_FragColor = vec4(cleanRgb * alpha, alpha);
  }
`;

const DEFAULT_KEY_COLOR = [0.0, 1.0, 0.0];

/**
 * LaunchLoader Component
 *
 * Fullscreen inauguration overlay featuring launch_final.mp4.
 * Hardware-accelerated WebGL chroma-key transparently replaces the green screen
 * area with the live website landing page sitting underneath.
 */
export default function LaunchLoader({
  onEnded,
  similarity = 0.35,
  smoothness = 0.20,
  spill = 0.35,
  keyColor = DEFAULT_KEY_COLOR,
}) {
  const isLaunchEnabled = IS_LAUNCH_ENABLED;

  const [kR, kG, kB] = keyColor;

  const [launchState, setLaunchState] = useState(
    isLaunchEnabled ? 'loading' : 'disabled'
  );
  const [isRevealing, setIsRevealing] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const webglResourcesRef = useRef(null);

  // Trigger smooth transition out of the intro
  const handleEndTransition = useCallback(() => {
    setLaunchState((prev) => {
      if (prev === 'ending' || prev === 'completed' || prev === 'disabled') {
        return prev;
      }
      return 'ending';
    });
  }, []);

  // Prevent scrolling during launch, restore when completed or unmounted
  useEffect(() => {
    if (!isLaunchEnabled || launchState === 'disabled' || launchState === 'completed') {
      document.documentElement.classList.remove('launch-pending');
      return;
    }

    document.documentElement.classList.add('launch-pending');
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.classList.remove('launch-pending');
    };
  }, [isLaunchEnabled, launchState]);

  // Safety fallback for ending transition
  useEffect(() => {
    if (launchState !== 'ending') return;

    const timer = setTimeout(() => {
      setLaunchState('completed');
      document.documentElement.classList.remove('launch-pending');
      onEnded?.();
    }, 350);

    return () => clearTimeout(timer);
  }, [launchState, onEnded]);

  // Allow Escape key to exit intro
  useEffect(() => {
    if (launchState === 'disabled' || launchState === 'completed') return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleEndTransition();
        onEnded?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [launchState, handleEndTransition, onEnded]);

  // WebGL Chroma-Key Engine
  useEffect(() => {
    if (!isLaunchEnabled) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
    });

    let isUsing2DFallback = false;
    let ctx2D = null;

    if (!gl) {
      ctx2D = canvas.getContext('2d');
      isUsing2DFallback = true;
    }

    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('WebGL shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function initWebGL() {
      const vs = compileShader(VS_SOURCE, gl.VERTEX_SHADER);
      const fs = compileShader(FS_SOURCE, gl.FRAGMENT_SHADER);
      if (!vs || !fs) return null;

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn('WebGL program link error:', gl.getProgramInfoLog(program));
        return null;
      }

      gl.useProgram(program);

      // Geometry quad: 2 triangles
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1,
        ]),
        gl.STATIC_DRAW
      );

      const aPosition = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      // Texture Coordinates (Y flipped for WebGL)
      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          0, 0,
          1, 0,
          0, 1,
          0, 1,
          1, 0,
          1, 1,
        ]),
        gl.STATIC_DRAW
      );

      const aTexCoord = gl.getAttribLocation(program, 'a_texCoord');
      gl.enableVertexAttribArray(aTexCoord);
      gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);

      // Texture setup
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Uniforms
      const uSimilarity = gl.getUniformLocation(program, 'u_similarity');
      const uSmoothness = gl.getUniformLocation(program, 'u_smoothness');
      const uSpill = gl.getUniformLocation(program, 'u_spill');
      const uKeyColor = gl.getUniformLocation(program, 'u_keyColor');

      gl.uniform1f(uSimilarity, similarity);
      gl.uniform1f(uSmoothness, smoothness);
      gl.uniform1f(uSpill, spill);
      gl.uniform3fv(uKeyColor, new Float32Array([kR, kG, kB]));

      return { program, texture, positionBuffer, texCoordBuffer };
    }

    if (!isUsing2DFallback) {
      webglResourcesRef.current = initWebGL();
      if (!webglResourcesRef.current) {
        isUsing2DFallback = true;
        ctx2D = canvas.getContext('2d');
      }
    }

    let hasRenderedFirstFrame = false;

    // Chroma-Key Rendering Loop
    const renderFrame = () => {
      if (video.paused || video.ended) return;

      // Extend duration of the fade-up transition just before the green screen (t=3.6s to 6.7s)
      if (video.currentTime >= 3.6 && video.currentTime < 6.7) {
        if (video.playbackRate !== 0.45) {
          video.playbackRate = 0.45;
        }
      } else if (video.playbackRate !== 1.0) {
        video.playbackRate = 1.0;
      }

      // When reaching the green screen reveal (t >= 5.5s), make container transparent to reveal landing page
      if (video.currentTime >= 5.5 && !isRevealing) {
        setIsRevealing(true);
      }

      if (!isUsing2DFallback && gl && webglResourcesRef.current) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.bindTexture(gl.TEXTURE_2D, webglResourcesRef.current.texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          video
        );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else if (ctx2D) {
        ctx2D.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx2D.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const maxRB = Math.max(r, b);
          if (g > 65 && g > maxRB * 1.25) {
            data[i + 3] = 0; // Transparent to reveal landing page
          }
        }
        ctx2D.putImageData(frame, 0, 0);
      }

      if (!hasRenderedFirstFrame) {
        hasRenderedFirstFrame = true;
        setLaunchState('playing');
      }

      if ('requestVideoFrameCallback' in video) {
        animationFrameRef.current = video.requestVideoFrameCallback(renderFrame);
      } else {
        animationFrameRef.current = requestAnimationFrame(renderFrame);
      }
    };

    const handleLoadedMetadata = () => {
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
    };

    const handlePlay = () => {
      if ('requestVideoFrameCallback' in video) {
        animationFrameRef.current = video.requestVideoFrameCallback(renderFrame);
      } else {
        animationFrameRef.current = requestAnimationFrame(renderFrame);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }
    if (!video.paused) {
      handlePlay();
    }

    // Safely trigger autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Launch video autoplay blocked or interrupted:', error);
        handleEndTransition();
      });
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);

      if (animationFrameRef.current) {
        if ('cancelVideoFrameCallback' in video) {
          video.cancelVideoFrameCallback(animationFrameRef.current);
        } else {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
    };
  }, [isLaunchEnabled, similarity, smoothness, spill, kR, kG, kB, handleEndTransition]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;

      // Smoothly initiate exit slightly before video ends so fade begins naturally
      if (total > 1 && current >= total - 0.6 && launchState === 'playing') {
        handleEndTransition();
      }
    }
  };

  const handleVideoEnded = () => {
    handleEndTransition();
    onEnded?.();
  };

  const handleVideoError = (e) => {
    console.warn('Intro video failed to load:', e);
    handleEndTransition();
    onEnded?.();
  };

  const handleTransitionEnd = (e) => {
    if (e.target === containerRef.current && launchState === 'ending') {
      setLaunchState('completed');
      document.documentElement.classList.remove('launch-pending');
      onEnded?.();
    }
  };

  if (launchState === 'disabled' || launchState === 'completed') {
    return null;
  }

  const isExiting = launchState === 'ending';
  const isPlaying = launchState === 'playing' || launchState === 'ending';

  return (
    <div
      ref={containerRef}
      className={`launch-loader ${isPlaying ? 'is-playing' : ''} ${isRevealing ? 'is-revealing' : ''} ${isExiting ? 'exit' : ''}`}
      onTransitionEnd={handleTransitionEnd}
      aria-label="Launch Intro"
    >
      {/* Hidden preloaded video source providing frames to WebGL */}
      <video
        ref={videoRef}
        src={launchVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="launch-loader-hidden-video"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onError={handleVideoError}
      />

      {/* Hardware-accelerated WebGL chroma key canvas replacing green screen with landing page */}
      <canvas ref={canvasRef} className="launch-loader-canvas" />
    </div>
  );
}
