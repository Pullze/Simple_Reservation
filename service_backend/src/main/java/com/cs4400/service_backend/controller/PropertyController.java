package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.entity.Response;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.PropertyProcess;
import com.cs4400.service_backend.service.UserProcess;
import com.cs4400.service_backend.vo.PropertyInfo;
import com.cs4400.service_backend.vo.ReserveInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(tags = "Property Controller")
@RestController
public class PropertyController {

    @Autowired
    private PropertyProcess propertyProcess;

    /**
     * Get all properties.
     * @param high higher bound of capacity.
     * @param low lower bound of capacity.
     * @return a list of property as require.
     */
    @GetMapping(value = "/properties")
    @ApiOperation(value = "view Properties", notes = "view properties.")
    public Response<?> properties(@RequestParam(required = false) Integer high,@RequestParam(required = false) Integer low) {
        if (high == null) {
            high = Integer.MAX_VALUE;
        }

        if (low == null) {
            low = 0;
        }
        List<Property> result = propertyProcess.viewProperties(high, low);
        System.out.println(result);

        Response<?> response = new Response<>(HttpStatus.OK.value(), "", result);
        return response;
    }

    /**
     * view Available properties
     * @param start start date in the filter
     * @param end end date in the filter
     * @return list of available properties.
     */
    @GetMapping(value = "/available-properties")
    @ApiOperation(value = "available Properties", notes = "available Properties")
    public List<Property> availableProperties(@RequestParam String start, @RequestParam String end) {
        List<Property> result = propertyProcess.viewAvailableProperties(start, end);
        System.out.println(result);
        return result;
    }

    /**
     * reserve a property
     * @param reserve reservation object
     * @return result
     */
    @PostMapping(value = "/reserve-property")
    @ApiOperation(value = "reserve Property", notes = "reserve Property")
    public Response<?> reserveProperty(@RequestPart("jsonValue") @Valid Reserve reserve) {
        String message = propertyProcess.reserveProperty(reserve);
        Response<Reserve> response = new Response<>();
        response.setData(reserve);
        response.setMessage(message);
        if (message.equals("Reserved succeeded!")) {
            response.setCode(HttpStatus.OK.value());
        } else {
            response.setCode(HttpStatus.BAD_REQUEST.value());
        }
        return response;
    }

    /**
     * Get all future reservations.
     * @param customerEmail customer's email
     * @return Response contain of ReserveInfo
     */
    @GetMapping(value = "/customer-future-reservations")
    @ApiOperation(value ="customer future reservations", notes = "customer future reservations")
    public Response<?> viewCustomerFutureReservations(@RequestParam String customerEmail) {
        List<ReserveInfo> result = propertyProcess.viewCustomerFutureReservations(customerEmail);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    /**
     * Get all past reservations
     * @param customerEmail customer's email
     * @return response contain of ReserveInfo
     */
    @GetMapping(value = "/customer_past_reservations")
    @ApiOperation(value ="customer past reservations", notes = "customer past reservations")
    public Response<?> viewCustomerPastReservations(@RequestParam String customerEmail) {
        List<ReserveInfo> result = propertyProcess.viewCustomerPastReservations(customerEmail);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    /**
     *
     * @param customerEmail customer's email
     * @return
     */
    @GetMapping(value = "/reservations_to_review")
    @ApiOperation(value ="customer view reservations to review", notes = "reservations to review")
    public Response<?> viewReservationsToReview(@RequestParam String customerEmail) {
        List<ReserveInfo> result = propertyProcess.viewReservationsToReview(customerEmail);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    /**
     *
     * @param customerEmail customer's email
     * @return
     */
    @GetMapping(value = "/owners-to-rate")
    @ApiOperation(value ="customer view owners to rate", notes = "customer view owners to rate")
    public Response<?> viewOwnersToRate(@RequestParam String customerEmail) {
        List<ReserveInfo> result = propertyProcess.viewOwnersToRate(customerEmail);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    @PostMapping(value = "/rate_owner")
    @ApiOperation(value ="rate owner", notes = "rate owner")
    public Response<?> rateOwner(@RequestParam String ownerEmail ,@RequestParam String customerEmail, @RequestParam Integer score) {
        String result = propertyProcess.rateOwner(ownerEmail, customerEmail, score);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), result);
    }

    /**
     * Cancel property reservation.
     * @param propertyName the property's name.
     * @param ownerEmail the owner Email.
     * @param customerEmail the customer Email.
     * @return Response object
     */
    @PostMapping(value = "/cancel_reservation")
    @ApiOperation(value ="cancel reservation", notes = "cancel reservation")
    public Response<?> cancelPropertyReservation(@RequestParam String propertyName,@RequestParam String ownerEmail ,@RequestParam String customerEmail) {
        String result = propertyProcess.cancelPropertyReservation(propertyName, ownerEmail, customerEmail);
        System.out.println(result);
        return new Response(HttpStatus.OK.value(), "");
    }

    /**
     *
     * @param propertyName property's name
     * @param ownerEmail owner's email
     * @param customerEmail cutomer's email
     * @param content content
     * @param score score
     * @return Response object
     */
    @PostMapping(value = "/review_reservation")
    @ApiOperation(value ="review reservation", notes = "review reservation")
    public Response<?> reviewReservation(@RequestParam String propertyName,@RequestParam String ownerEmail ,@RequestParam String customerEmail, @RequestParam(required = false) String content, @RequestParam Integer score) {
        String result = propertyProcess.reviewReservation(propertyName, ownerEmail, customerEmail, content, score);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success");
    }

    @GetMapping(value = "/property_reservations")
    @ApiOperation(value ="property reservations", notes = "property reservations")
    public Response<?> viewPropertyReservations() {
        List<ReserveInfo> result = propertyProcess.viewPropertyReservations();
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    @PostMapping(value = "/owner-add-property")
    @ApiOperation(value = "owner add property")
    public Response<?> ownerAddProperty(@RequestBody Property property, @RequestParam(required = false) String nearestAirport, @RequestParam(required = false) Integer distance) {
        PropertyInfo propertyInfo = propertyProcess.addProperty(property, nearestAirport, distance);
        String message = propertyInfo.getMessage();
        if (message.equals("Successfully added this property!")) {
            return new Response<>(200, message, propertyInfo);
        } else {
            return new Response<>(400, message);
        }
    }
}

