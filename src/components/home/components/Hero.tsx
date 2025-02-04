import Image from "next/image"

export default function Hero() {
  return (
    <section className="grid w-full gap-6 lg:grid-cols-2 lg:gap-12">
      <div className="w-full space-y-4">
        <h1 className="font-nestleBrush text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
          Product Life-Cycle Tool
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Identify potential price growth and pack-size change opportunities,
          prescribe price and assortment changes while considering
          cannibalization and competition and simulate the impact on business.
        </p>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/Imagen1.png"
          alt="hero imahe"
          width={200}
          height={200}
          className="rounded-lg object-cover"
          priority
        />
      </div>
    </section>
  )
}
