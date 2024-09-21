'use client';

import { generateDoodles } from '@/actions/generate';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image'; // Asegúrate de importar Image de Next.js
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'; // Asegúrate de importar el componente de diálogo
import { Star, Share2, Repeat, X } from 'lucide-react'; // Asegúrate de tener estos íconos

export default function Generate() {
  const [doodles, setDoodles] = useState([]); // Cambiado a un array de objetos Doodle
  const [selectedDoodle, setSelectedDoodle] = useState(null);

  return (
    <div className='p-24'>
      <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        Doodle Generator
      </h2>
      <div className='p-8 text-center'>
        <Button
          onClick={async () => {
            const newDoodles = await generateDoodles();
            setDoodles(newDoodles); // Actualiza el estado con los nuevos doodles
          }}
        >
          Generate
        </Button>
      </div>
      <div className='flex flex-wrap mt-8 gap-4'>
        {doodles.map((doodle) => (
          <motion.div
            key={doodle.id}
            className='group relative mb-5 block w-full overflow-hidden rounded-lg bg-gradient-to-b from-violet-600 to-indigo-900 shadow-xl transition-all duration-300 hover:shadow-2xl'
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className='relative'>
              <Image
                alt={doodle.name}
                className='w-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-75'
                src={doodle.path} // Usar el path del doodle
                width={400}
                height={400}
                layout='responsive'
              />
              <div className='absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded-full'>
                <Star
                  className={`h-4 w-4 ${
                    doodle.rarity === 'legendary'
                      ? 'text-yellow-500'
                      : doodle.rarity === 'rare'
                      ? 'text-blue-500'
                      : 'text-green-500'
                  }`}
                />
              </div>
            </div>
            <div className='p-4'>
              <h3 className='text-lg font-semibold text-white mb-2'>{doodle.name}</h3>
              <p className='text-sm text-gray-300 mb-4'>Rareza: {doodle.rarity}</p>
              <div className='flex justify-between items-center'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
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
                        src={selectedDoodle?.path} // Usar el path del doodle
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
                <Button variant='ghost' className='text-white hover:bg-white/20'>
                  <Share2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
