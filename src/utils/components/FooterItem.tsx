interface IProps {
  children?: React.ReactNode;
  href?: string;
}

export default function FooterItem({ children, href }: IProps) {
  return (
    <li>
      <a href={href} className="hover:underline me-4 md:me-6">
        {children}
      </a>
    </li>
  );
}
