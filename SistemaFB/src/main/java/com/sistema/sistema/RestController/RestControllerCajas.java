package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoMethodOfPaymed.CajasDto;
import com.sistema.sistema.Service.CajasService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestControllerCajas {

    private final CajasService cajasService;

    public RestControllerCajas(CajasService cajasService) {
        this.cajasService = cajasService;
    }

    @GetMapping("/methodPaymed")
    public List<CajasDto> getMethodOfPaymed(){
        return cajasService.getMethodPaymed();
    }
}
