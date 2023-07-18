import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { RootState, Dispatch } from '../models/store';
import HomePage from './HomePage';

type Props = StateProps & DispatchProps & any;

const Portal = (props: Props) => {
  const { containerRef, updateContainerSize } = props;
  const [loggedIn, setLoggedIn] = useState<string | null>('');

  useEffect(() => {
    window.addEventListener('resize', computeContainerSize);
    return () => window.removeEventListener('resize', computeContainerSize);
  }, []);

  useEffect(() => {
    computeContainerSize();
  }, [containerRef, containerRef.current]);

  const computeContainerSize = () => {
    const containerElement: HTMLDivElement = containerRef?.current as any;

    updateContainerSize({
      height: containerElement?.getBoundingClientRect()?.bottom,
      width: containerElement?.getBoundingClientRect()?.right,
    });
  };

  const renderHomePage = () => {
    return <HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
  };

  return (
    <div className="portal" ref={containerRef}>
      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} />
      ) : (
        <>{renderHomePage()}</>
      )}
    </div>
  );
};

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
  updateContainerSize: dispatch.containerSize.update,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(Portal);
