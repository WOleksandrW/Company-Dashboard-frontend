import { useMemo } from 'react';

import imgPlaceholder from '../../assets/images/image-placeholder.png';

import styles from './ImageBlock.module.scss';

interface IProps {
  imgSrc?: string;
  altText?: string;
  className?: string;
  size?: 'normal' | 'large';
}

function ImageBlock({ imgSrc, altText, className, size }: IProps) {
  const classNames = useMemo(() => {
    const arr = [styles['img-block']];
    if (size) arr.push(styles[size]);
    if (className) arr.push(className);
    return arr.join(' ');
  }, [size, className]);

  return (
    <div className={classNames}>
      <img className={styles['img']} src={imgSrc ?? imgPlaceholder} alt={altText} />
    </div>
  );
}

export default ImageBlock;
