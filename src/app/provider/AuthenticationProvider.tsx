'use client'

import React, { useEffect, useState } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { createHash, randomBytes } from "crypto";
import { useRouter } from "next/navigation";

interface oAuthConfig {

  authorizeUri: string,
  tokenUri: string,
  clientId: string,
  redirectUri: string,
  scopes: string[]

}

export function AuthenticationProvider({ children, oAuthConfig }: { children: React.ReactNode, oAuthConfig: oAuthConfig }) {

  interface Session {

    access_token: string
    expires_in: number

  }

  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)

  function generatePKCEPair() {
    const NUM_OF_BYTES = 22
    const HASH_ALG = 'sha256'
    const randomVerifier = randomBytes(NUM_OF_BYTES).toString('hex')
    const hash = createHash(HASH_ALG).update(randomVerifier).digest('base64')
    const challenge = hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    return { verifier: randomVerifier, challenge }
  }

  const login = () => {

    const { verifier, challenge } = generatePKCEPair()
    localStorage.setItem('verifier', verifier)

    const scopeFormatted = oAuthConfig.scopes.reduce((str1, str2) => str1 + "," + str2)
    window.location.href = `${oAuthConfig.authorizeUri}?response_type=code&client_id=${oAuthConfig.clientId}&scope=${scopeFormatted}&redirect_uri=${oAuthConfig.redirectUri}&code_challenge=${challenge}&code_challenge_method=S256`
  };

  const logout = () => {

    window.location.href = `http://localhost:3000`

  }

  const finishAuthentication = (code: string) => {

    const verifier = localStorage.getItem('verifier')

    if (verifier == null)
      return

    const formData = new URLSearchParams();
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('redirect_uri', oAuthConfig.redirectUri);
    formData.append('client_id', oAuthConfig.clientId);
    formData.append('code_verifier', verifier);

    fetch(`${oAuthConfig.tokenUri}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {

      localStorage.removeItem('verifier')

      const newSession: Session = {
        access_token: data.access_token,
        expires_in: Date.now() + data.expires_in * 1000
      }

      setSession(newSession)
      router.push("/")
    })
    .catch((error) => {})

  }

  const checkIsAuthenticated = () => {
    return session != null && Date.now() < session.expires_in;
  };

  const contextValue = {
    isAuthenticated: checkIsAuthenticated,
    login,
    logout,
    finishAuthentication,
    session
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}