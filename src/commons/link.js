import { Link } from "react-router-dom";

export const CustomLink = ({ className, to, title, ...props}) => {
  return (
    <Link className={className} to={to} {...props}>
      {title}
    </Link>
  );
};
