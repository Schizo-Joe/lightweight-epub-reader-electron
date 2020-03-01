import {bookReducer} from "../../src/renderer/reducers/bookReducer";
import {setBookContent} from "../../src/renderer/actions/bookActions";
import {Book} from "epub-chinese-converter";

describe('bookReducer', () => {
    it('should setBookContent', () => {
        // given
        const bookWithMeta: Book.BookWithMeta = {metadata: {}, chapters: {}};
        const prevState = {
            isLoadingBook: false,
            bookWithMeta: undefined,
        };

        // when
        const newState = bookReducer(prevState, setBookContent(bookWithMeta));

        // then
        expect(newState.bookWithMeta).toEqual(bookWithMeta);
    });
});
