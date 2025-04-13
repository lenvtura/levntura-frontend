import Image from 'next/image';
import hero from '@/assets/photos/about_hero.png';
import { Button } from '@/design-system/button';

export function WhereJourneysBegin() {
  return (
    // <section className='relative h-screen'>
    //   <div className='grid grid-cols-[60%_40%] absolute inset-0 -z-10'>
    //     <div className='bg-lev-yellow' />
    //     <div className='bg-lev-yellow-light' />
    //   </div>
    //   <div className='container space-y-10'>
    //     <article className='grid grid-cols-2'>
    //       <div className='flex flex-col gap-y-4 self-end'>
    //         <h6 className='uppercase typography-M16 text-lev-orange'>
    //           Discover Levntura
    //         </h6>

    //         <h1 className='typography-EB74 leading-16 w-3/6 uppercase text-lev-red-dark'>
    //           Where Journeys <span className='text-lev-orange'>Begin</span>
    //         </h1>

    //         <div className='flex gap-x-4'>
    //           <Button className='border-1 typography-EB16' size='lg'>
    //             Start Now!
    //           </Button>
    //           <Button className='border-1 typography-EB16' size='lg'>
    //             Contact US
    //           </Button>
    //         </div>
    //       </div>
    //
    //     </article>

    //     <article className='grid grid-cols-[65%_35%]'>
    //       <p className='opacity-50 typography-R16 leading-5 w-3/4'>
    //         From our headquarters in Amman Jordan, to our office in Egypt, we
    //         have been providing the aspiring Middle Eastern Youth with
    //         exceptional cultural exchange, study abroad and Professional
    //         training opportunities in North America, Europe and Australia. What
    //         we offer is far more superior to opportunities; We change lives
    //         throughout leadership development, our contributions to language
    //         acquisition, and most significantly, igniting the spirit of
    //         adventure and ambition in the Youngsters.
    //       </p>
    //       <p className='opacity-50 typography-R16 leading-5 w-3/4'>
    //         Levntura has rapidly become a beacon for those seeking to expand
    //         their horizons through educational services and cultural exchange
    //         programs. With a mission to empower the next generation of global
    //         leaders, we offer experiences that challenge, enlighten, and open
    //         doors to limitless opportunities
    //       </p>
    //     </article>
    //   </div>
    // </section>
    <section className='relative min-h-screen flex flex-col justify-center bg-lev-yellow'>
      <Image
        src={hero}
        alt='about'
        // height={500}
        // width={700}
        className='lg:absolute right-0 top-0 md:max-w-1/2 max-h-[60vh] mb-12 lg:mb-0'
      />
      <div className='container pb-12 lg:pb-0 space-y-12'>
        <div className='flex flex-col gap-y-4 self-end'>
          <h6 className='uppercase typography-M16 text-lev-orange'>
            Discover Levntura
          </h6>

          <h1 className='text-6xl leading-14 font-extrabold md:typography-EB74 md:leading-16 w-3/6 uppercase text-lev-red-dark'>
            Where <br /> Journeys <br />
            <span className='text-lev-orange'>Begin</span>
          </h1>

          <div className='flex gap-x-4'>
            <Button className='border-1 typography-EB16' size='lg'>
              Start Now!
            </Button>
            <Button className='border-1 typography-EB16' size='lg'>
              Contact US
            </Button>
          </div>
        </div>
        <article className='lg:flex justify-between space-y-8'>
          <p className='opacity-50 typography-R16 leading-5 w-4/5 lg:w-2/4'>
            From our headquarters in Amman Jordan, to our office in Egypt, we
            have been providing the aspiring Middle Eastern Youth with
            exceptional cultural exchange, study abroad and Professional
            training opportunities in North America, Europe and Australia. What
            we offer is far more superior to opportunities; We change lives
            throughout leadership development, our contributions to language
            acquisition, and most significantly, igniting the spirit of
            adventure and ambition in the Youngsters.
          </p>
          <p className='opacity-50 typography-R16 leading-5 w-4/5 lg:w-3/10'>
            Levntura has rapidly become a beacon for those seeking to expand
            their horizons through educational services and cultural exchange
            programs. With a mission to empower the next generation of global
            leaders, we offer experiences that challenge, enlighten, and open
            doors to limitless opportunities.
          </p>
        </article>
      </div>
      <div className='hidden lg:block absolute right-0 top-0 bottom-0 left-6/10 bg-lev-yellow-light -z-10' />
    </section>
  );
}
