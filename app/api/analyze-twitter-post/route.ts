import { NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log('Received URL:', url);

    const tweetId = extractTweetId(url);

    if (!tweetId) {
      console.log('Invalid Twitter URL');
      return NextResponse.json({ error: 'Invalid Twitter URL. Please ensure you\'ve entered a valid Twitter post URL.' }, { status: 400 });
    }

    const nitterUrl = `https://nitter.net/${tweetId}`;
    const response = await axios.get(nitterUrl, { timeout: 5000 }); // Set a 5-second timeout

    if (response.status !== 200) {
      throw new Error(`Nitter returned status code ${response.status}`);
    }

    const $ = cheerio.load(response.data);

    const comments = $('.reply-wrapper').map((_, el) => {
      const $el = $(el);
      return {
        id: $el.attr('id'),
        text: $el.find('.tweet-content').text().trim(),
        author: $el.find('.fullname').text().trim(),
        date: $el.find('.tweet-date a').attr('title'),
      };
    }).get();

    if (comments.length === 0) {
      return NextResponse.json({ error: 'No comments found for this Twitter post. The post might be private or have no replies.' }, { status: 404 });
    }

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error in POST function:', error);
    let errorMessage = 'An unexpected error occurred while analyzing the Twitter post.';
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'The request to analyze the Twitter post timed out. Please try again later.';
      } else if (error.response) {
        errorMessage = `Error from Nitter: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'Unable to reach the Nitter service. Please check your internet connection and try again.';
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function extractTweetId(url: string): string | null {
  console.log('Extracting tweet ID from URL:', url);
  
  const twitterRegex = /twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/;
  const match = url.match(twitterRegex);
  
  if (match) {
    console.log('Extracted tweet ID:', `${match[1]}/status/${match[2]}`);
    return `${match[1]}/status/${match[2]}`;
  }
  
  console.log('Failed to extract tweet ID');
  return null;
}