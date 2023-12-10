import { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

const CountingNumber = ({ endValue }: { endValue: number }) => {
    const [, setCount] = useState<number>(0);

    const props = useSpring({
        from: { count: 0 },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to: async (next: any) => {
            await next({ count: endValue });
        },
        config: { duration: 700 },
        onFrame: ({ count }: { count: number }) => setCount(Math.floor(count))
    });

    useEffect(() => setCount(0), [endValue]);

    return <animated.span>{props.count.to(value => Math.floor(value))}</animated.span>;
};

export default CountingNumber;
