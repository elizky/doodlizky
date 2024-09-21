export default async function Home() {
  return (
    <div>
      <h1>Doodles Generados</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {[...Array(15)].map((_, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={`doodles/output/doodle${index}.png`}
            alt={`Doodle ${index}`}
            style={{ width: '100px', height: '100px', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
}
