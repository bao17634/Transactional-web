package com.gitee.taven.myselfdemo.controller;

import com.gitee.taven.myselfdemo.dto.OrderDTO;
import com.gitee.taven.myselfdemo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author ：Byr
 * @date ：Created in 2019/9/15 21:24
 * @description：
 * @modified By：
 * @modified Date：
 * @version: $
 */
@RestController
@RequestMapping(value = "WebController")
public class WebController {
    @Autowired
    private OrderService orderService;
    @RequestMapping(value = "/queryInfo")
    public OrderDTO queryInfo(){
        return orderService.queryInfo();
    }
    @RequestMapping(value = "/updateInfo")
    public Integer updateInfo(OrderDTO orderDTO){
        Integer a=orderService.updateSaas(orderDTO.getSaasHouse().get(0));
        Integer b=orderService.updateTss(orderDTO.getTssHouse().get(0));
        return a+b;
    }
}
