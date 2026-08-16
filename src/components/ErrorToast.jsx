import { toast } from 'react-hot-toast';

export default function ErrorToast({ t, title = "Request Failed", message = "We encountered an anomaly while processing your submission. Please try again." }) {
  return (
    <div
      className={`${
        t.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
      } transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full max-w-sm bg-surface border border-outline-variant border-l-4 border-l-error shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] pointer-events-auto p-6`}
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-headline-md text-primary text-xl mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-error">error</span>
            {title}
          </h3>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {message}
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-on-surface-variant hover:text-primary transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
}
