import {useFetcher} from 'react-router';
import {type Customer, useCustomer} from '~/hooks/useCustomer';

type NewsletterResult = {ok: true} | {ok: false; error: string};

export default function NewsletterForm() {
  const fetcher = useFetcher<NewsletterResult>();
  const {isLoading, isLoggedIn, customer} = useCustomer();

  const isSubmitting = fetcher.state === 'submitting';
  const result = fetcher.data;

  return (
    <section className="border-b border-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="font-playFair text-2xl mb-4"
            style={{
              textShadow: '2px 1px #C3A343'
            }}
          >
              Join the Baseline Circle
            </h2>
          <p className='font-source text-sm text-white mb-6'>Subscribe to receive updates on new collections and exclusive offers</p>
          <fetcher.Form
            method="post"
            // action="/newsletter"
            action={ (!isLoading && isLoggedIn && customer ) ? '/account/newsletter' : '/newsletter' }
            replace
            className="w-full flex flex-wrap justify-center gap-4"
          >
            <input
              type='email'
              placeholder='Your email Address'
              className='flex-1 px-4 py-3 bg-white border-white rounded-md text-black placeholder:text-gray-400 font-source'
              required
              name='email'
            />
            <button
              type='submit'
              className='w-max px-6 py-3 text-gray-400 bg-white hover:bg-brand-mainLight hover:text-white transition-colors duration-300 rounded-md font-source'
            >
              Subscribe
            </button>
          </fetcher.Form>
        </div>
      </div>

      {result && !result.ok && (
        <p style={{color: 'red'}}>{result.error}</p>
      )}
      {result && result.ok && (
        <p>Please accept email subscription invitation!</p>
      )}
    </section>
  );
}