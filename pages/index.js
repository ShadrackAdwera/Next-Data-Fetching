import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

const HomePage = props => {
    const { items } = props;
    return <ul>
        {items.map(item=><li key={item.id}>
            <Link href={`/${item.id}`}>{item.title}</Link>
        </li>)}
    </ul>;
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(),'data','dummy-data.json');
    const stringifiedData = await fs.readFile(filePath);
    const data = JSON.parse(stringifiedData);

    //returns a 404 page
    if(!data) {
        return { notFound: true }
    }

    //redirect to a certain page
    if(data.length===0) {
        return { redirect: {
            destination: '/'
        } }
    }

    return {props: {
        items: data.items
    },
    revalidate: 10 
};
}

export default HomePage;