import ProductPageContent from '@/components/pages/ProductPageContent'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ProductPageContent slug={slug} />
}
