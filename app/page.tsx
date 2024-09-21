'use client';

import { useState } from 'react';
import { PenTool, Sparkles, Share2, Repeat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import Head from 'next/head';
import Image from 'next/image';

const doodles = [
  { id: 1, name: 'Squiggly', rarity: 'common', image: '/image.jpg' },
  { id: 2, name: 'Zigzag', rarity: 'rare', image: '/image.jpg' },
  { id: 3, name: 'Swirly', rarity: 'legendary', image: '/image.jpg' },
  { id: 4, name: 'Loopy', rarity: 'common', image: '/image.jpg' },
  { id: 5, name: 'Sparkly', rarity: 'rare', image: '/image.jpg' },
  { id: 6, name: 'Glowy', rarity: 'legendary', image: '/image.jpg' },
  { id: 7, name: 'Arrow', rarity: 'legendary', image: '/image.jpg' },
  { id: 8, name: 'Fancy', rarity: 'legendary', image: '/image.jpg' },
  { id: 9, name: 'Garage', rarity: 'legendary', image: '/image.jpg' },
];

export default function DoodlizkyMain() {
  const [selectedDoodle, setSelectedDoodle] = useState(null);

  return (
    <>
      <Head>
        <title>Doodlizky - Colección de Doodles</title>
        <meta property='og:image' content='/og-image.png' />
        <meta name='twitter:image' content='/og-image.png' />
      </Head>
      <main className={`mx-auto max-w-[1960px] p-4 `}>
        <div className='columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4'>
          <div className='after:content relative mb-5 flex h-[450px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-gradient-to-b from-violet-600 to-indigo-900 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0'>
            <div className='absolute inset-0 flex items-center justify-center opacity-20'>
              <span className='flex max-h-full max-w-full items-center justify-center'>
                <Sparkles className='h-64 w-64' />
              </span>
              <span className='absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-violet-900/0 via-indigo-900 to-indigo-900'></span>
            </div>
            <PenTool className='h-16 w-16' />
            <h1 className='mt-8 mb-4 text-3xl font-bold uppercase tracking-widest'>Doodlizky</h1>
            <p className='max-w-[40ch] text-white/75 sm:max-w-[32ch]'>
              Explora, colecciona e intercambia doodles únicos en nuestra plataforma interactiva.
            </p>
            <Button
              className='pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4'
              variant='outline'
            >
              Empezar a Coleccionar
            </Button>
          </div>
          {doodles.map((doodle) => (
            <div key={doodle.id} className='group relative mb-5 block w-full'>
              <Image
                alt={doodle.name}
                className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
                style={{ transform: 'translate3d(0, 0, 0)' }}
                src={doodle.image}
                width={720}
                height={480}
                sizes='(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw'
              />
              <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className='text-white border-white hover:bg-white/20 transition-colors'
                      onClick={() => setSelectedDoodle(doodle)}
                    >
                      Ver Detalles
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='bg-black border-white/20 text-white'>
                    <DialogHeader>
                      <DialogTitle>{selectedDoodle?.name}</DialogTitle>
                      <DialogDescription className='text-gray-400'>
                        Detalles del Doodle
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <Image
                        src={selectedDoodle?.image}
                        alt={selectedDoodle?.name}
                        className='w-full aspect-square object-cover rounded-lg'
                        width={400}
                        height={400}
                      />
                      <p className='text-gray-300'>
                        Rareza:{' '}
                        <span
                          className={
                            selectedDoodle?.rarity === 'legendary'
                              ? 'text-yellow-500'
                              : selectedDoodle?.rarity === 'rare'
                              ? 'text-blue-500'
                              : 'text-green-500'
                          }
                        >
                          {selectedDoodle?.rarity}
                        </span>
                      </p>
                      <div className='flex justify-between'>
                        <Button className='flex items-center bg-white/10 hover:bg-white/20 text-white'>
                          <Repeat className='mr-2 h-4 w-4' /> Intercambiar
                        </Button>
                        <Button className='flex items-center bg-white/10 hover:bg-white/20 text-white'>
                          <Share2 className='mr-2 h-4 w-4' /> Compartir
                        </Button>
                      </div>
                    </div>
                    <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
                      <X className='h-4 w-4' />
                      <span className='sr-only'>Close</span>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
