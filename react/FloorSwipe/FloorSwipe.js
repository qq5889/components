/*
 * @Desc: 能上下滑动中间放大效果的楼层切换器，需要引入swiper组件
 * @Author: Jackie
 * @Date: 2019-06-19 09:22:20
 * @Last Modified by: Jackie
 * @Last Modified time: 2019-06-19 09:23:29
 */
import React, { PureComponent } from 'react';
import { Badge } from 'antd';
import Swiper from 'swiper/dist/js/swiper';

import 'swiper/dist/css/swiper.min.css';
import styles from './FloorSwipe.less';

export default class FloorSwipe extends PureComponent {
  componentDidMount () {
    const { defaultIndex, onSlideItemChange, onSlideInited } = this.props;
    this.swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      effect: 'coverflow',
      initialSlide: defaultIndex,
      slideToClickedSlide: true,
      centeredSlides: true,
      slidesOffsetBefore: -10,
      spaceBetween: '20%',
      slidesPerView: '3',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 95,
        modifier: 1,
        slideShadows: false,
      },
      on: {
        init: () => onSlideInited(defaultIndex),
        transitionEnd: () => onSlideItemChange(this.swiper && this.swiper.activeIndex),
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderFloor(floorNum, badgeCount, id) {
    return (
      <div className="swiper-slide" key={id}>
        <Badge className={styles.badges} count={badgeCount} />
        <div className={styles.floorBg}>{floorNum}</div>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderBtn(src, onClick) {
    return <img className={styles.arrow} src={src} alt="" onClick={onClick} />;
  }

  render() {
    const { list } = this.props;
    return (
      <div className={styles.container}>
        {this.renderBtn('./assets/common/up.png', () => this.swiper.slidePrev())}
        <div className="swiper-container" style={{ height: 300, marginTop: 10, marginBottom: 10 }}>
          <div className="swiper-wrapper">
            {list.map(item => this.renderFloor(item.sort, item.errorCount, item.id))}
          </div>
        </div>
        {this.renderBtn('./assets/common/down.png', () => this.swiper.slideNext())}
      </div>
    );
  }
}
