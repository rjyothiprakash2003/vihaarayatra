import { lazy, Suspense } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/Home/HomePage'

const AboutPage = lazy(() =>
  import('@/pages/About/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const DestinationsPage = lazy(() =>
  import('@/pages/Destinations/DestinationsPage').then((m) => ({
    default: m.DestinationsPage,
  })),
)
const DestinationDetailPage = lazy(() =>
  import('@/pages/Destinations/DestinationDetailPage').then((m) => ({
    default: m.DestinationDetailPage,
  })),
)
const PackagesPage = lazy(() =>
  import('@/pages/Packages/PackagesPage').then((m) => ({ default: m.PackagesPage })),
)
const PackageDetailPage = lazy(() =>
  import('@/pages/Packages/PackageDetailPage').then((m) => ({
    default: m.PackageDetailPage,
  })),
)
const GroupToursPage = lazy(() =>
  import('@/pages/GroupTours/GroupToursPage').then((m) => ({
    default: m.GroupToursPage,
  })),
)
const GalleryPage = lazy(() =>
  import('@/pages/Gallery/GalleryPage').then((m) => ({ default: m.GalleryPage })),
)
const TravelGuidesPage = lazy(() =>
  import('@/pages/TravelGuides/TravelGuidesPage').then((m) => ({
    default: m.TravelGuidesPage,
  })),
)
const GuideDetailPage = lazy(() =>
  import('@/pages/TravelGuides/GuideDetailPage').then((m) => ({
    default: m.GuideDetailPage,
  })),
)
const ContactPage = lazy(() =>
  import('@/pages/Contact/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const PrivacyPolicyPage = lazy(() =>
  import('@/pages/Legal/PrivacyPolicyPage').then((m) => ({
    default: m.PrivacyPolicyPage,
  })),
)
const TermsPage = lazy(() =>
  import('@/pages/Legal/TermsPage').then((m) => ({ default: m.TermsPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function PageFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center text-sm text-muted"
      role="status"
      aria-live="polite"
    >
      Loading…
    </div>
  )
}

function LazyOutlet() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Outlet />
    </Suspense>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<LazyOutlet />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="packages/:slug" element={<PackageDetailPage />} />
          <Route path="group-tours" element={<GroupToursPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="travel-guides" element={<TravelGuidesPage />} />
          <Route path="travel-guides/:slug" element={<GuideDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-and-conditions" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
