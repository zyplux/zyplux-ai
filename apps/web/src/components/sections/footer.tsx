import { Zap } from 'lucide-react';

export const Footer = () => (
  <footer className='relative mt-24 py-12 border-t border-border' id='connect'>
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
        <div className='col-span-1 md:col-span-2'>
          <div className='flex items-center gap-2 mb-4'>
            <Zap className='h-6 w-6 text-accent' />
            <span className='text-xl font-bold tracking-tight text-heading'>Zyplux</span>
          </div>
          <p className='text-muted max-w-md'>
            Building the next generation of agentic web systems through advanced cognitive frameworks and neural
            intelligence architectures.
          </p>
        </div>

        <div>
          <h3 className='font-semibold text-heading mb-4'>Navigate</h3>
          <ul className='space-y-2'>
            {['Capabilities', 'Connect'].map(item => (
              <li key={item}>
                <a className='text-muted hover:text-accent transition-colors' href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-heading mb-4'>Resources</h3>
          <ul className='space-y-2'>
            <li className='text-muted'>Documentation (Coming Soon)</li>
            <li className='text-muted'>API Reference (Coming Soon)</li>
          </ul>
        </div>
      </div>

      <div className='pt-8 border-t border-border text-center text-sm text-muted'>
        <p>
          © {new Date().getFullYear()} Zyplux. Powered by autonomous cognitive systems and neural processing frameworks.
        </p>
      </div>
    </div>
  </footer>
);
