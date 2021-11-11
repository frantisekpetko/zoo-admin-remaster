import React, { FC} from 'react';


const Content:FC<{children: React.ReactNode}> = (props) => {
    return <div className={'grid-middle'}>{props.children}</div>;
};

export default Content;
