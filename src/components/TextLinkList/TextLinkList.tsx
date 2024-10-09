import { NavLink } from 'react-router-dom';

import styles from './TextLinkList.module.scss';

interface IProps {
  list: {
    text: string;
    lintText: string;
    linkTo: string;
  }[];
}

function TextLinkList({ list }: IProps) {
  return (
    <div className={styles['list']}>
      {list.map(({ text, lintText, linkTo }) => (
        <p className={`p2 ${styles['link-text']}`} key={linkTo}>
          {text}
          <NavLink className={`link secondary-color ${styles['link']}`} to={linkTo}>
            {lintText}
          </NavLink>
        </p>
      ))}
    </div>
  );
}

export default TextLinkList;
