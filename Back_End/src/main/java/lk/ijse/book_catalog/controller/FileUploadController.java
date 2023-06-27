package lk.ijse.book_catalog.controller;

import lk.ijse.book_catalog.dto.BookDTO;
import lk.ijse.book_catalog.dto.ImgDTO;
import lk.ijse.book_catalog.util.ResponseUtil;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/upload")
@CrossOrigin
public class FileUploadController {

    //Formalized end-point to upload files using Spring
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadFileWithSpringWay(@RequestPart("book") MultipartFile book) {
        try {
            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            System.out.println(projectPath);
            uploadsDir.mkdir();
            book.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + book.getOriginalFilename()));

            //Save the path of the uploaded images in dto
            ImgDTO imgDTO = new ImgDTO();

            imgDTO.setBookImgPath("uploads/" + book.getOriginalFilename());

            return new ResponseUtil("200", "success" + imgDTO, imgDTO);
        } catch (URISyntaxException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

//    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseUtil uploadFileWithSpringWay(@RequestPart("book") MultipartFile bookImage) {
//        try {
//            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
//            System.out.println(projectPath);
//            File uploadsDir = new File(projectPath + "/uploads");
//            uploadsDir.mkdir();
//            bookImage.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + bookImage.getOriginalFilename()));
//
//            //Save the path of the uploaded images in dto
//            ImgDTO imgDTO = new ImgDTO();
//
//
//            imgDTO.setBookImgPath("uploads/" + bookImage.getOriginalFilename());
//
//            return new ResponseUtil("200", "success" + imgDTO, imgDTO);
//        } catch (URISyntaxException e) {
//            e.printStackTrace();
//            throw new RuntimeException(e.getMessage());
//        } catch (IOException e) {
//            e.printStackTrace();
//            throw new RuntimeException(e.getMessage());
//        }
//    }
}
