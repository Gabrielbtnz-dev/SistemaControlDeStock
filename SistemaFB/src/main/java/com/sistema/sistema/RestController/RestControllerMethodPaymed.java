package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.methodOfPaymedDto;
import com.sistema.sistema.Service.MethodPaymedService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestControllerMethodPaymed {

    private final MethodPaymedService methodPaymedService;

    public RestControllerMethodPaymed(MethodPaymedService methodPaymedService) {
        this.methodPaymedService = methodPaymedService;
    }

    @GetMapping("/methodPaymed")
    public List<methodOfPaymedDto> getMethodOfPaymed(){
        return methodPaymedService.getMethodPaymed();
    }
}
