import Link from 'next/link'
import connectDB from '@/lib/mongodb/connection'
import DonationConfig from '@/models/DonationConfig'
import PixSection from '@/components/PixSection'
import ShareButtons from '@/components/ShareButtons'

export const revalidate = 60

const CONFIG_ID = 'donation-config'

const defaultConfig = {
  pixKey: '',
  pixCopiaECola: '',
  pixQrCodeUrl: '',
  itemsNeeded: [] as string[],
  deliveryInfo: '',
  deliveryAddress: '',
}

export default async function AjudarPage() {
  let config = defaultConfig

  try {
    await connectDB()
    const doc = await DonationConfig.findById(CONFIG_ID).lean()
    if (doc) {
      config = {
        pixKey: doc.pixKey ?? '',
        pixCopiaECola: doc.pixCopiaECola ?? '',
        pixQrCodeUrl: doc.pixQrCodeUrl ?? '',
        itemsNeeded: doc.itemsNeeded ?? [],
        deliveryInfo: doc.deliveryInfo ?? '',
        deliveryAddress: doc.deliveryAddress ?? '',
      }
    }
  } catch {
    // Usar defaults se MongoDB indisponível
  }

  return (
    <div className="container mx-auto px-4">
      <section className="relative bg-gradient-to-br from-accent-50/60 via-white to-accent-50/40 overflow-hidden py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="headline-hero mb-6">
            Como Ajudar
          </h1>
          <p className="subtitle-hero max-w-2xl mx-auto">
            Não pode adotar agora? Você pode ajudar doando, contribuindo com ração ou divulgando nosso trabalho.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 space-y-12">
        <div className="max-w-3xl mx-auto">
          <PixSection
            pixKey={config.pixKey}
            pixCopiaECola={config.pixCopiaECola}
            pixQrCodeUrl={config.pixQrCodeUrl}
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-elevated p-8">
            <h2 className="text-xl font-semibold mb-2">Doação de ração e materiais</h2>
            <p className="text-gray-600 text-sm mb-6">
              Esses itens ajudam muito os cães que aguardam adoção.
            </p>

            {config.itemsNeeded.length > 0 ? (
              <>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Itens necessários
                </h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  {config.itemsNeeded.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-500 mb-6">Lista de itens em breve. Entre em contato para saber como doar.</p>
            )}

            {(config.deliveryInfo || config.deliveryAddress) ? (
              <div className="space-y-3">
                {config.deliveryAddress && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">Onde entregar</h3>
                    <p className="text-gray-700">{config.deliveryAddress}</p>
                  </div>
                )}
                {config.deliveryInfo && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">Informações</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{config.deliveryInfo}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Informações de entrega em breve.</p>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-elevated p-8">
            <h2 className="text-xl font-semibold mb-2">Divulgar</h2>
            <p className="text-gray-600 text-sm mb-6">
              Compartilhe o Amigo de 4 Patas e ajude mais cães a encontrarem um lar.
            </p>
            <ShareButtons />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-accent-50 border border-accent-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-2">Quer adotar?</h2>
            <p className="text-gray-700 mb-6">
              Conheça os cães disponíveis e inicie seu processo de adoção.
            </p>
            <Link
              href="/"
              className="inline-block bg-accent-200 text-white py-4 px-8 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
            >
              Ver cães disponíveis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
