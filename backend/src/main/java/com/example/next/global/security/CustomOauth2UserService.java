package com.example.next.global.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOauth2UserService extends DefaultOAuth2UserService {

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String oauthId = oAuth2User.getName(); //식별자
        String providerType = userRequest.getClientRegistration().getRegistrationId();


        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> propeties = (Map<String, Object>)attributes.get("properties");

        String nickname = (String)propeties.get("nickname");
        String profileImage = (String)propeties.get("profile_image");
        String username = providerType + "__" + oauthId;
        System.out.println("oAuth2User = " + oAuth2User);

        return new SecurityUser(0, username, "", nickname, List.of());
    }

}
