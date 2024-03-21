// 'use client'
import AddToCartButton from '@/components/AddToCartButton'
import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductComment from '@/components/ProductComment'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'
import { getServerSiderUser } from '@/lib/payload.utils'
import { formatPrice } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Book, Check, MessageSquare, Send, Shield, ThumbsDown, ThumbsUp } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useState } from 'react'

interface PageProps {
  params: {
    productId: string
  }
}


const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
]

const Page = async ({ params }: PageProps) => {
  const { productId } = params

  const payload = await getPayloadClient()

  const nextCookies =cookies()
  const { user } = await getServerSiderUser(nextCookies)

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })


  const [product] = products

  if (!product) return notFound()

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]
  // const [comment, setComment]=useState<any>()

  const ThumbsUps=()=>{
    // trpc.Provider.mutation
    console.log(1)
  }
  console.log(product.comments)
  const likeCount=product.likes?.length || 0
  const dislikeCount= product.dislikes?.length || 0

  const SubmitCommentHandler=()=>{
    if(user==null){
      return (
      <div>
        {user?null:
          <p className='flex mt-2 text-center text-red-600'>You are required to sign in before making a comment.
          </p>
       }
      </div>
      )
      
    }
  }
  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {product.name}
              </h1>
            </div>

            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-gray-900'>
                  {formatPrice(product.price)}
                </p>

                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {label}
                </div>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {product.description}
                </p>
              </div>

              <div className='mt-6 flex items-center'>
                <Check
                  aria-hidden='true'
                  className='h-5 w-5 flex-shrink-0 text-green-500'
                />
                <p className='ml-2 text-sm text-muted-foreground'>
                  Eligible for instant delivery
                </p>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider urls={validUrls} />
            </div>
          </div>
          
          {/* add to cart part */}
          <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <div>
                <div className='mt-10'>
                    {/* add to cart */}
                    <AddToCartButton product={product}/>
                   
                </div>
                <div className='mt-6 text-center'>
                    <div className='group inline-flex text-sm text-medium'>
                      
                        <Shield
                            aria-hidden='true'
                            className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                        ></Shield>
                        <span className='text-muted-foreground hover: text-gray-700'>
                            300 Day Return Guarantee
                        </span>
                    </div>
                </div>

                <div className='group inline-flex'>
                  <button>
                    <ThumbsUp 
                      aria-hidden='true'        
                      className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                      />   
                  </button>
                  <p className='mr-2 text-gray-600 space-x-4'> {likeCount}</p>
                  <ThumbsDown 
                    aria-hidden='true'
                    className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400' />
                   <p className='text-gray-600'>{dislikeCount}</p>
                 </div>
            </div>
          </div>
        </div>
      </div>

    <section className="w-full rounded-lg border-2 border-blue-600 p-4 my-8 mx-auto">
      <h3 className="font-os text-lg font-bold">Comments of this product</h3>

      <div className="ml-3">
        {product.comments?.map((comment,id)=>
        <>
          <div className="mt-2 font-medium text-blue-800">Hiddened Name</div>
          {/* <div className="text-gray-600">Posted on 2023-10-02 14:30</div> */}
          <p className="text-gray-900">
            {comment}
          </p>
          </>)
        ||
          <p className="mt-2 font-medium text-black-800"> be the first one to comment!</p>
        }
      </div>

      {/* leaving comment */}
      <form 
        className="mt-4"
        // onSubmit={()=>1}  
      >
        <div className="mb-4">
            <label className="block text-blue-800 font-medium">leave a comment below</label>
            <textarea className="border-2 border-blue-600 p-2 w-full rounded"></textarea>
        </div>

        <button 
          className="bg-blue-700 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
          // onClick={}
        >
          Post Comment
        </button>
      </form> 
    </section>


    {/* recommend products which is showing same category items  */}
    <ProductReel 
        href='/products'
        query={{category:product.category,limit:4}}
        //same category
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
    />
    </MaxWidthWrapper>
  )
}

export default Page