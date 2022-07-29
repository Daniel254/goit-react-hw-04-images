import { API_KEY } from 'constants/pixabay';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    page: 1,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

const getImagesByQuery = async (q, page = 1) => {
  try {
    const {
      data: { hits, totalHits },
    } = await axiosInstance.get('/', {
      params: {
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
