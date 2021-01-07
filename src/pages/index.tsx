import { NextComponentType, NextPageContext } from 'next';
import { HomeAttributes } from 'interfaces/home';

interface Props {
  content: { attributes: HomeAttributes };
}

const HomePage: NextComponentType<NextPageContext, Props, Props> = (
  props: Props
) => {
  const { content } = props;
  return <>HomePage</>;
};

export default HomePage;
