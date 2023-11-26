import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';

import { getImages } from './api';

export const App = () => {
  const [target, setTarget] = useState('');
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitData = newTarget => {
    setPage(1);
    setData([]);
    setTarget(newTarget);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (target === '') return;

    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await getImages(target, page);
        const { hits, totalHits } = data;
        setData(prev => [...prev, ...hits]);
        setTotalPages(Math.ceil(totalHits / 12));
      } catch {
        toast.error('Error! Try again!');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [page, target]);

  return (
    <>
      <SearchBar onSubmitData={onSubmitData} />
      {isLoading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{
            display: 'block',
            margin: '0 auto',
          }}
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      ) : (
        <ImageGallery target={target} data={data} />
      )}
      {totalPages > 1 && page < totalPages && (
        <Button onLoadMore={onLoadMore} />
      )}
      <Toaster position="top-right" />
    </>
  );
};
