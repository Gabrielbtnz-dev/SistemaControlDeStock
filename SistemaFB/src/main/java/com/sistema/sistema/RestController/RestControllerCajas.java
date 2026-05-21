package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoCajas.CajasDto;
import com.sistema.sistema.Service.CajasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestControllerCajas {

    private final CajasService cajasService;

    public RestControllerCajas(CajasService cajasService) {
        this.cajasService = cajasService;
    }

    @GetMapping("/cuentasCajas")
    public List<CajasDto> getMethodOfPaymed(){
        return cajasService.getMethodPaymed();
    }

    @PostMapping("/addCuentasCajas")
    public ResponseEntity<?> postCuentasCajas(@RequestBody CajasDto dto){
        return cajasService.postCuentasCajas(dto);
    }
}
