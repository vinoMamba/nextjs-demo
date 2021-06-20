import Link from "next/link";
import _ from "lodash";

type  Options = {
    count: number,
    perPage: number,
    page: number,
    totalPage: number
}

export const usePager = (options: Options) => {
    const {page, totalPage} = options;
    const numbers = [];
    numbers.push(1);
    for (let i = page - 3; i < page + 3; i++) {
        numbers.push(i);
    }
    numbers.push(totalPage);
    const result = _.uniq(numbers).sort().filter(n => n >= 1 && n < totalPage);

    const pager = (
        <div>
            {JSON.stringify(result)}
            {page !== 1 && <Link href={`/posts?page=${page - 1}`}><a>上一页</a></Link>}
            {page < totalPage && <Link href={`/posts?page=${page + 1}`}><a>下一页</a></Link>}
            第{page}/{totalPage}页
        </div>
    );
    return {
        pager
    };
};