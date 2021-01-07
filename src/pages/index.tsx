import { NextComponentType, NextPageContext } from 'next';
import { HomeAttributes } from 'interfaces/home';

interface Props {
  content: { attributes: HomeAttributes };
}

const HomePage: NextComponentType<NextPageContext, Props, Props> = (
  props: Props
) => {
  const { content } = props;
  return <div className="text-indigo-500">HomePage</div>;
};

export default HomePage;
