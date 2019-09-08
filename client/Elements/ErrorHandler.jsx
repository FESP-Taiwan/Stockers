// @flow
/** @jsx jsx */

import { Fragment, useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import EventEmitter from 'events';
import { NOTIFICATION_INDEX } from '../Constant/zIndex';
import { ErrorHandlerContext } from '../Constant/context';

const styles = {
  wrapper: {
    position: 'fixed',
    zIndex: NOTIFICATION_INDEX,
    width: '100%',
    height: 'auto',
    top: 0,
    left: 0,
  },
  message: {
    margin: 0,
    backgroundColor: Colors.ERROR,
    color: '#fff',
    fontWeight: 400,
    fontSize: 15,
    textAlign: 'center',
    width: '100%',
    lineHeight: 2,
    opacity: 1,
    height: 30,
    position: 'relative',
    transform: 'translate(0, 0)',
    transition: 'opacity 0.24s ease-out, height 0.24s ease-out, transform 0.24s ease-out',
  },
  messageMissing: {
    opacity: 0,
    transform: 'translate(0, -30px)',
    height: 0,
  },
};

function ErrorHandler({
  children,
}: {
  children: Node,
}) {
  const [errorStack, setErrorStack] = useState([]);
  const [errorHub, setErrorHub] = useState(new EventEmitter());
  const [ERROR] = useState(Symbol('FormError'));
  const [counter, setCounter] = useState(0);
  const [timeoutMap, setTimeoutMap] = useState({});

  const ERROR_DISPLAY_TIME = 3000;

  function makeMessageClear(id) {
    return () => {
      const index = errorStack.findIndex(err => err.id === id);

      if (~index) {
        setErrorStack([
          ...errorStack.slice(0, index),
          ...errorStack.slice(index + 1),
        ]);
      }
    };
  }

  function onError(errorMessage) {
    setCounter(counter + 1);

    const id = counter;

    setErrorStack([{
      id,
      message: errorMessage,
      createdAt: Date.now(),
    }, ...errorStack,
    ]);

    setTimeoutMap({
      ...timeoutMap,
      id: setTimeout(
        makeMessageClear(id),
        ERROR_DISPLAY_TIME + 1000,
      ),
    });
  }

  useEffect(() => {
    errorHub.on(ERROR, onError);

    return () => errorHub.removeListener(ERROR, onError);
  });

  return (
    <Fragment>
      <div style={styles.wrapper}>
        {errorStack.slice(0, 2).map((error, index) => (
          <p
            key={error.id}
            css={[
              styles.message,
              { zIndex: index },
              ((Date.now() - error.createdAt) > ERROR_DISPLAY_TIME)
                && styles.messageMissing,
            ]}>
            {error.message}
          </p>
        ))}
      </div>
      <ErrorHandlerContext.Provider
        value={{
          errorHub,
          ERROR,
        }}>
        {children}
      </ErrorHandlerContext.Provider>
    </Fragment>
  );
}

export default ErrorHandler;
