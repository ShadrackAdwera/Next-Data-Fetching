const UserPage = props => {
    const { id } = props;
return <h1>{id}</h1>
}

//when using getServerSideProps, you don't need to use getStaticPaths
//since this method only runs on the server anyway and Next,js does not pregenerate any pages at all
// does not need to know which pages to pregenerate (no pregeneration), no need to generate the dynamic paths in advance.
export function getServerSideProps(context) {
    const { params } = context;
    const currentUserId = params.userId;
    return {props: { id: `User ID: ${currentUserId}` }}
}

export default UserPage;