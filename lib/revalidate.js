export const revalidate = (startTransition, router) => {
    startTransition(() => router.refresh())
}