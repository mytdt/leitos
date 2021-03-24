import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './Info.scss';

/**
 * Information component that renders inside a card.
 *
 * @param  {Array}        props.infos Array of informations to render
 * @param  {Boolean}      props.show  Whether is to show the element
 * @return {ReactElement}             The markup to render
 */
const Info = ({ infos, show }) => {
  const nodeRef = React.useRef(null);
  const numberFormat = new Intl.NumberFormat('pt-BR');

  return (
    <CSSTransition
      nodeRef={ nodeRef }
      in={ show }
      appear={ show }
      timeout={ {
        appear: 300,
        enter: 300,
        exit: 125,
      } }
      mountOnEnter
      unmountOnExit
    >
      <div ref={ nodeRef } className="card-info">
        {
          infos.map((singleInfo, index) => {
            const left = (index + 1) % 2 !== 0;
            const className = left ? 'info-left' : 'info-right';
            const value = numberFormat.format(singleInfo.value);

            return (
              <div key={ index } className={ className }>
                <span className="info-value" title={ value }>
                  { value }
                </span>
                <span className="info-name">
                  { singleInfo.name }
                  { typeof singleInfo.percentage !== 'undefined'
                    ? (
                      <>
                        { ' ~ ' }
                        <span className={ singleInfo.percentage.class }>
                          { singleInfo.percentage.value }
                          %
                        </span>
                      </>
                    )
                    : null }
                </span>
              </div>
            );
          })
        }
      </div>
    </CSSTransition>
  );
};

Info.propTypes = {
  infos: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      percentage: PropTypes.shape({
        value: PropTypes.number.isRequired,
        class: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  show: PropTypes.bool.isRequired,
};

export default Info;
