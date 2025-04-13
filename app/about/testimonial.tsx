import studentImg from '@/assets/photos/s-1.png';
import Image from 'next/image';

export function Testimonial() {
  return (
    <section className='bg-lev-black pt-20 h-screen'>
      <div className='container space-y-8'>
        <article className='space-y-4'>
          <h4 className='typography-M20 text-lev-red uppercase'>testimonial</h4>

          <h1 className='text-5xl sm:text-6xl font-extrabold lg:typography-EB74 leading-16'>
            <span className='text-white opacity-20'>STUDENTS</span> <br />
            <span className='text-white ms-20 lg:ms-40'>FEEDBACK</span>
          </h1>
        </article>
        <section className='flex flex-row-reverse gap-2 md:gap-8'>
          <article className='overflow-hidden w-1/2 md:w-70 h-100 relative'>
            {Array.from({ length: 3 }).map((el, idx) => (
              <Comment
                key={idx}
                className='flex flex-col justify-between bg-white p-4 h-90 absolute bottom-full animate-to-bottom'
                style={{
                  animationDelay: `calc(20s / 3 * (3 - ${idx + 1}) * -1)`,
                }}
              />
            ))}
          </article>
          <article className='overflow-hidden w-1/2 md:w-70 h-100 relative'>
            {Array.from({ length: 3 }).map((el, idx) => (
              <Comment
                key={idx}
                className='flex flex-col justify-between bg-white p-4 h-90 absolute top-full animate-to-top'
                style={{
                  animationDelay: `calc(20s / 3 * (3 - ${idx + 1}) * -1)`,
                }}
              />
            ))}
          </article>
        </section>
      </div>
    </section>
  );
}

function Comment(props: React.ComponentProps<'div'>) {
  return (
    <div {...props}>
      <div className='quotes'>
        <p>Highly recommend, experienced people and great service.</p>
      </div>
      <div className='flex items-center gap-3'>
        <div className='student_img'>
          <Image src={studentImg} alt='' />
        </div>
        <div className='student_name'>
          <h6>Yazan Al-Halawani</h6>
          <h6 className='position'>Student</h6>
        </div>
      </div>
    </div>
  );
}
