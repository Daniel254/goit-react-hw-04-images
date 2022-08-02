import { PIXABAY_API_KEY, PIXABAY_BASE_URL } from 'constants/pixabay';

import axios from 'axios';

const defaultGetParams = {
  page: 1,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const axiosInstance = axios.create({
  baseURL: PIXABAY_BASE_URL,
  params: {
    key: PIXABAY_API_KEY,
  },
});

const getImagesByQuery = async (q, page = 1) => {
  try {
    const {
      data: { hits, totalHits },
    } = await axiosInstance.get('/', {
      params: {
        ...defaultGetParams,
        q,
        page,
      },
    });

    if (totalHits === 0) {
      throw new Error('Images not found');
    }
    return {
      hits,
      totalHits,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getImagesByQuery as default };
