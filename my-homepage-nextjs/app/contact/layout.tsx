import { UniversalLayout } from "../template";

export default function ContactLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <UniversalLayout title={"Contact"}>{children}</UniversalLayout>
    )
  }