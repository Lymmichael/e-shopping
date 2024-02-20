import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf, Link } from "lucide-react";


const perks=[
  {
    name:'Instant Delivery',
    Icon: ArrowDownToLine,
    description:'Get asset to email and download'
  },
  {
    name:'Guaranteed Quality',
    Icon: CheckCircle,
    description:'Our products have been verified'
  },
  {
    name:'For the Planet',
    Icon: Leaf,
    description:'We get 1% of sales for profit.'
  },
]
export default function Home() {
  return (
    <>
    <MaxWidthWrapper>
      <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
        <h1 className='text-4xl font-bold tracking-tight text-grey-900 sm:text-6xl'>
          Your marketplace for high-quality{' '}
        <span className='text-blue-600'>
          assets
        </span>
        .
        </h1>
        <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
          Weclome to DigitalHippo. Every asset on our platform is verified by our team.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-6'>
          <a href='/products' className={buttonVariants()}>Browse Trending</a>
          <Button variant='ghost'>Our Quality Promise &rarr;</Button>
        </div>
      </div>

      {/* TODO: List products */}
      <section className='border-t border-gray-200 bg-gray-50'>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid0cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 '>
            {perks.map(
              (perk)=>(
              <div key={perk.name} className='text-center lg:block lg:text-center md:flex md:text-left md:items-start'>
                <div className='flex md:flex-shrink-0 justify-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3'/>}
                  </div>
                </div>
                <div className='mt-5 md:ml-3 md:mt-1 lg:ml-0 lg:mt-5'>
                  <h3 className='text-base font-medium text-grey-800'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>)
            )}
          </div>
        </MaxWidthWrapper>
      </section>
    </MaxWidthWrapper>
    </>
  );
}
