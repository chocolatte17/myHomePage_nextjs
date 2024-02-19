import { UniversalLayout } from "../template";

export default function AboutLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        <UniversalLayout title={"About"}>{children}</UniversalLayout>
    )
}