"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FormCardProps {
  title: string;
  description: string;
  inputs: { placeholder: string }[];
  dropdowns?: { placeholder: string; options: { value: string; label: string }[] }[];
  footerButtonText?: string;
}

const FormCard: React.FC<FormCardProps> = ({ title, description, inputs, dropdowns, footerButtonText }) => {
  const [selectedChains, setSelectedChains] = useState<string[]>([]);

  const handleChainSelect = (value: string) => {
    setSelectedChains((prevSelectedChains) =>
      prevSelectedChains.includes(value)
        ? prevSelectedChains.filter((chain) => chain !== value)
        : [...prevSelectedChains, value]
    );
  };

  const getSelectedChainNames = () => {
    const chainNames = dropdowns?.flatMap((dropdown) =>
      dropdown.options.filter((option) => selectedChains.includes(option.value)).map((option) => option.label)
    );
    return chainNames?.join(", ") || "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {inputs.map((input, index) => (
          <Input key={index} placeholder={input.placeholder} className="my-2" />
        ))}
        {dropdowns &&
          dropdowns.map((dropdown, index) => (
            <>
              <div key={index} className="my-2">
                <Select onValueChange={handleChainSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder={dropdown.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {dropdown.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 text-sm">
                <strong>Selected Chains:</strong> {getSelectedChainNames()}
              </div>
            </>
          ))}
      </CardContent>
      {footerButtonText && (
        <CardFooter className="border-t px-6 py-4">
          <Button>{footerButtonText}</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default FormCard;