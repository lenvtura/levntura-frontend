import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/design-system/carousel';
import aboAlMashaikh from '@/assets/photos/founder.png';
import johnDoe from '@/assets/photos/mask-group30.png';
import { Button } from '@/design-system/button';

const founders = [
  {
    title: 'Co Founder',
    name: 'Ahmad Al-Mashaikh',
    description:
      'Cultivate the next generation of global leaders through immersive international experiences. Our tailor-made programs are designed not just to traverse borders, but to transcend them—offering you the keys to a realm where your potential knows no bounds. With Levntura, embark on a voyage that enriches, enlightens, and empowers.',
    photo: aboAlMashaikh,
  },
  {
    title: 'Co Founder',
    name: 'John Doe',
    description:
      'Embark on a journey with Levntura where leadership and innovation converge. Our programs are crafted to empower individuals to break through boundaries and achieve unprecedented growth, both personally and professionally.',
    photo: johnDoe,
  },
];

export function OurFoundersCarousel() {
  return (
    <section>
      <div className='container'>
        <Carousel className='w-full'>
          <CarouselContent>
            {founders.map((person, index) => (
              <CarouselItem key={index} className='h-screen'>
                <Image
                  src={person.photo}
                  alt={person.name}
                  // height={700}
                  // width={900}
                  className='absolute h-screen object-cover -z-10'
                />

                <div className='grid lg:grid-cols-3 h-full p-4'>
                  <div className='flex flex-col items-start justify-end lg:justify-center lg:col-start-3 text-white gap-y-4'>
                    <h2 className='typography-S34 text-white uppercase'>
                      {person.title}
                    </h2>
                    <h6 className='typography-B16'>{person.name}</h6>
                    <p className='typography-R14 leading-4 w-80'>
                      {person.description}
                    </p>
                    <Button className='border-1 border-white'>
                      Contact Us
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-4 text-white border-white' />
          <CarouselNext className='right-4 text-white border-white' />
        </Carousel>
      </div>
    </section>
  );
}
