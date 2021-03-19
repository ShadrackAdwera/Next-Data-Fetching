const HomePage = props => {

    const { items } = props;

    return <ul>
        {items.map(item=><li key={item.id}>{item.name}</li>)}
    </ul>;
}

export async function getStaticProps() {
    return {props: {
        items: [
            { id: Date.now(), name: 'Item One'}
        ]
    }};
}

export default HomePage;