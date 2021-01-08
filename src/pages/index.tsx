import { NextComponentType, NextPageContext } from 'next';
import Header from 'components/header';
import { SiteCreate, SiteList } from 'components/sites';
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
      <SiteList />
      <SiteCreate />
    </div>
  );
};

export default HomePage;
