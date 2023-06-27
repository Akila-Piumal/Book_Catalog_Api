package lk.ijse.book_catalog.service.impl;

import lk.ijse.book_catalog.dto.BookDTO;
import lk.ijse.book_catalog.entity.Book;
import lk.ijse.book_catalog.repo.BookRepo;
import lk.ijse.book_catalog.service.BookService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public ArrayList<BookDTO> getAllBooks() {
        return mapper.map(repo.findAll(),new TypeToken<ArrayList<BookDTO>>(){}.getType());
    }

    @Override
    public BookDTO getBookById(String bookId) {
        Book byBookId = repo.findByBookId(bookId);
        return mapper.map(byBookId,BookDTO.class);
    }

    @Override
    public boolean deleteById(String bookId) {
        int rowCount = repo.deleteBookById(bookId);
        return rowCount>0;
    }

    @Override
    public boolean updateById(double price,String bookId) {
        int rowCount = repo.updateBookById(price, bookId);
        return rowCount>0;
    }

    @Override
    public void saveBook(BookDTO bookDTO) {
        Book book = mapper.map(bookDTO, Book.class);
        repo.save(book);
    }


}
