import { NextComponentType, NextPageContext } from 'next';
import Header from 'components/header';
import Post from 'components/post';
import { HomeAttributes } from 'interfaces/home';

interface Props {
  content: { attributes: HomeAttributes };
}

const HomePage: NextComponentType<NextPageContext, Props, Props> = (
  props: Props
) => {
  const { content } = props;
  return (
    <div className="text-indigo-500">
      <Header />
      <Post />
    </div>
  );
};

export default HomePage;
