import normalize from '../../../schema/image/normalize';
import { croppedImageUrl } from '../../../schema/image/cropped';

describe('Image', () => {
  describe('croppedImageUrl', () => {
    const image = {
      image_url: 'https://xxx.cloudfront.net/xxx/:version.jpg',
      image_versions: ['large'],
    };

    it('takes an image response with options and resizes it to crop', () => {
      croppedImageUrl(image, { width: 500, height: 500 })
        .should.eql({
          width: 500,
          height: 500,
          url: 'https://i.embed.ly.test/1/display/crop?url=https%3A%2F%2Fxxx.cloudfront.net%2Fxxx%2Flarge.jpg&width=500&height=500&key=xxx_embedly_key_xxx&quality=95',
        });
    });

    it('works with just a url and resizes it to crop', () => {
      const bareImageUrl = normalize('https://xxx.cloudfront.net/xxx/cat.jpg');
      croppedImageUrl(bareImageUrl, { width: 500, height: 500 })
        .should.eql({
          width: 500,
          height: 500,
          url: 'https://i.embed.ly.test/1/display/crop?url=https%3A%2F%2Fxxx.cloudfront.net%2Fxxx%2Fcat.jpg&width=500&height=500&key=xxx_embedly_key_xxx&quality=95',
        });
    });
  });
});
