import React from "react"
import { ArrowRight, CheckCircle, Clock, BarChart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const HomePage = () => {
  const features = [
    {
      icon: Clock,
      title: "Gestión de Tiempos",
      description:
        "Seguimiento de lanzamientos de productos a través de hitos de 120, 60 y 30 días con verificaciones y recordatorios automatizados.",
    },
    {
      icon: CheckCircle,
      title: "Flujo de Aprobaciones",
      description:
        "Gestión de procesos optimizada con indicadores de estado claros y verificaciones automáticas.",
    },
    {
      icon: BarChart,
      title: "Análisis en Tiempo Real",
      description:
        "Monitorea el progreso de lanzamientos, tasas de finalización e identifica cuellos de botella con análisis detallados.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src={"/nestleLogo.png"}
            alt="Nestlé Logo"
            width={100}
            height={100}
          />
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl md:text-6xl">
            Bienvenido a{" "}
            <span className="font-nestleBrush text-blue-600">PLC Tool</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Product Life Cycle - Optimiza el flujo de trabajo de lanzamiento de
            productos con nuestro sistema integral de gestión.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="/resumen"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700"
            >
              Ir al Resumen
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <feature.icon className="mb-4 h-12 w-12 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Timeline */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Cronograma del Proceso de Lanzamiento
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[120, 90, 60, 30].map((days, index) => (
            <div key={index} className="relative">
              <div className="absolute left-0 top-0 h-1 w-full bg-blue-200">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${((120 - days) / 120) * 100}%` }}
                />
              </div>
              <Card className="mt-6 border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold text-blue-600">
                    {days} Días
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Planificación inicial
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Asignación de recursos
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Seguimiento de hitos
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">
              ¿Listo para optimizar tus lanzamientos de productos?
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Únete a los equipos que ya están usando PLC Tool para gestionar
              sus lanzamientos de productos de manera eficiente.
            </p>
            <button className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-600 hover:bg-gray-50">
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
